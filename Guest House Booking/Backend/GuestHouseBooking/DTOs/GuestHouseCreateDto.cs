using System.ComponentModel.DataAnnotations;

namespace GuestHouseBooking.DTOs
{
    public class GuestHouseCreateDto
    {
        [Required, MaxLength(150)]
        public string Name { get; set; }

        [Required, MaxLength(200)]
        public string Location { get; set; }

        public string? Description { get; set; }
    }
}
