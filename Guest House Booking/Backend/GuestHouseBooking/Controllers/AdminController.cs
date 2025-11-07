using GuestHouseBooking.Data;
using GuestHouseBooking.DTOs;
using GuestHouseBooking.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace GuestHouseBooking.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Admin")] // <-- 1. This entire controller is locked to Admins
    public class AdminController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AdminController(ApplicationDbContext context)
        {
            _context = context;
        }

        // POST: api/admin/create-user
        [HttpPost("create-user")]
        public async Task<IActionResult> CreateUser(AdminCreateUserDto createUserDto)
        {
            // 2. Check if user already exists
            if (await _context.Users.AnyAsync(u => u.Email == createUserDto.Email))
            {
                return BadRequest("User with this email already exists.");
            }

            // 3. Find the role they want to assign
            var role = await _context.Roles.FirstOrDefaultAsync(r => r.RoleName == createUserDto.Role);
            if (role == null)
            {
                return BadRequest("Invalid role specified.");
            }

            // 4. Generate a random temporary password
            // (In a real app, you'd email this. For now, we just create one)
            var tempPassword = GenerateRandomPassword();
            string passwordHash = BCrypt.Net.BCrypt.HashPassword(tempPassword);

            // 5. Get the ID of the Admin *creating* this account

            var creatingAdminId = int.Parse(User.FindFirstValue("UserId"));
            // 6. Create the new User object
            var user = new User
            {
                UserName = createUserDto.UserName,
                Email = createUserDto.Email,
                PasswordHash = passwordHash,
                Gender = createUserDto.Gender,
                RoleId = role.RoleId,
                IsActive = true,
                CreatedDate = DateTime.UtcNow,
                CreatedBy = creatingAdminId
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            // 7. TODO: Add Email Service to send the tempPassword to the user

            // 8. Return the temp password for now so we can test
            return Ok(new
            {
                Message = "User created successfully",
                Email = user.Email,
                TemporaryPassword = tempPassword
            });
        }

        private string GenerateRandomPassword(int length = 12)
        {
            // Simple random password generator
            const string validChars = "ABCDEFGHIJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz123456789!@#$%^&*";
            var random = new Random();
            var password = new char[length];
            for (int i = 0; i < length; i++)
            {
                password[i] = validChars[random.Next(validChars.Length)];
            }
            return new string(password);
        }
    }
}