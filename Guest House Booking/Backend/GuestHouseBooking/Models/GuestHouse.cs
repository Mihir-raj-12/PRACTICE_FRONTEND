using System.ComponentModel.DataAnnotations;

namespace GuestHouseBooking.Models
{
    public class GuestHouse
    {
        public int GuestHouseId { get; set; }
        [Required, MaxLength(150)]
        public string Name { get; set; }
        [Required, MaxLength(200)]
        public string Location { get; set; }
        public string? Description { get; set; }
        public ICollection<Room> Rooms { get; set; } = new List<Room>();
        public bool Deleted { get; set; } = false;
        public DateTime CreatedDate { get; set; } = DateTime.UtcNow;
        public int CreatedBy { get; set; }
        public int? ModifiedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public int? DeletedBy { get; set; }
        public DateTime? DeletedDate { get; set; }
    }
}
