using System.ComponentModel.DataAnnotations;

namespace GuestHouseBooking.DTOs
{
    public class AdminCreateUserDto
    {
        [Required, MaxLength(100)]
        public string UserName { get; set; }

        [Required, EmailAddress, MaxLength(120)]
        public string Email { get; set; }

        [Required]
        public string Gender { get; set; } // "Male" or "Female"

        [Required]
        public string Role { get; set; } // "Admin" or "User"
    }
}
