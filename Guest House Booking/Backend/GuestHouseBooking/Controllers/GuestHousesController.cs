using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GuestHouseBooking.Data;
using GuestHouseBooking.Models;
using GuestHouseBooking.DTOs;
using Microsoft.AspNetCore.Authorization; // <-- 1. ADD THIS
using System.Security.Claims;// <-- 1. Import our DTOs

namespace GuestHouseBooking.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Admin")]
    public class GuestHousesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        // 2. This is Dependency Injection.
        // The .NET framework "injects" our DbContext for us.
        public GuestHousesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/GuestHouses
        [HttpGet]
        public async Task<ActionResult<IEnumerable<GuestHouse>>> GetGuestHouses()
        {
            // 3. This is our "Read" (R in CRUD)
            // We only return GuestHouses that are NOT deleted.
            return await _context.GuestHouses
                                 .Where(g => !g.Deleted)
                                 .ToListAsync();
        }

        // GET: api/GuestHouses/5
        [HttpGet("{id}")]
        public async Task<ActionResult<GuestHouse>> GetGuestHouse(int id)
        {
            // 4. This is our "Read by ID"
            var guestHouse = await _context.GuestHouses.FindAsync(id);

            // 5. We check for null *or* if it's marked as deleted.
            if (guestHouse == null || guestHouse.Deleted)
            {
                return NotFound(); // Return 404 Not Found
            }

            return guestHouse;
        }

        // PUT: api/GuestHouses/5
        // To protect from overposting attacks, see [https://go.microsoft.com/fwlink/?linkid=2123754](https://go.microsoft.com/fwlink/?linkid=2123754)
        [HttpPut("{id}")]
        public async Task<IActionResult> PutGuestHouse(int id, GuestHouseCreateDto guestHouseDto) // <-- 6. Use our DTO
        {
            // 7. This is our "Update" (U in CRUD)
            var guestHouse = await _context.GuestHouses.FindAsync(id);

            // 8. Find the guesthouse, and make sure it's not deleted
            if (guestHouse == null || guestHouse.Deleted)
            {
                return NotFound();
            }

            // 9. Map properties from the DTO to the model we found
            guestHouse.Name = guestHouseDto.Name;
            guestHouse.Location = guestHouseDto.Location;
            guestHouse.Description = guestHouseDto.Description;

            // 10. Set our Audit fields
            guestHouse.ModifiedDate = DateTime.UtcNow;
            guestHouse.ModifiedBy = GetCurrentUserId(); // TODO: We will replace '1' with the real logged-in User ID later

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.GuestHouses.Any(e => e.GuestHouseId == id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent(); // Return 204 No Content (standard for a successful PUT)
        }

        // POST: api/GuestHouses
        // To protect from overposting attacks, see [https://go.microsoft.com/fwlink/?linkid=2123754](https://go.microsoft.com/fwlink/?linkid=2123754)
        [HttpPost]
        public async Task<ActionResult<GuestHouse>> PostGuestHouse(GuestHouseCreateDto guestHouseDto) // <-- 11. Use our DTO
        {
            // 12. This is our "Create" (C in CRUD)

            // 13. Map our DTO to a *new* GuestHouse model
            var guestHouse = new GuestHouse
            {
                Name = guestHouseDto.Name,
                Location = guestHouseDto.Location,
                Description = guestHouseDto.Description,

                // 14. Set our Audit fields
                CreatedDate = DateTime.UtcNow,
                CreatedBy = GetCurrentUserId(), // TODO: Replace '1' with the real logged-in User ID later
                Deleted = false
            };

            _context.GuestHouses.Add(guestHouse);
            await _context.SaveChangesAsync();

            // 15. Return a 201 Created status, and tell the client where to find the new resource
            return CreatedAtAction("GetGuestHouse", new { id = guestHouse.GuestHouseId }, guestHouse);
        }

        // DELETE: api/GuestHouses/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteGuestHouse(int id)
        {
            // 16. This is our "Delete" (D in CRUD) - but we do a SOFT DELETE
            var guestHouse = await _context.GuestHouses.FindAsync(id);
            if (guestHouse == null)
            {
                return NotFound();
            }

            // 17. ** THIS IS THE SOFT DELETE **
            // We DO NOT remove it from the database.
            // We just set the flags.
            guestHouse.Deleted = true;
            guestHouse.DeletedDate = DateTime.UtcNow;
            guestHouse.DeletedBy = GetCurrentUserId(); // TODO: Replace '1' with the real logged-in User ID later
            // _context.GuestHouses.Remove(guestHouse); // <-- We DO NOT do this

            await _context.SaveChangesAsync();

            return NoContent(); // Return 204 No Content (standard for a successful DELETE)
        }

        private int GetCurrentUserId()
        {
            // This gets our custom "UserId" claim from the JWT token,
            // which we set in AuthController.
            var userIdString = User.FindFirstValue("UserId"); // <-- USE OUR CUSTOM CLAIM

            // We parse it to an integer. This is safe because [Authorize]
            // ensures we have a valid token and user.
            return int.Parse(userIdString);
        }


    }
}
