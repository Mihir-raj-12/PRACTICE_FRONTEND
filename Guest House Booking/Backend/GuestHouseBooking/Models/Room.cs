using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GuestHouseBooking.Models
{
    public class Room
    {
        public int RoomId { get; set; }
        [Required]
        public int GuestHouseId { get; set; }
        [ForeignKey("GuestHouseId")]
        public GuestHouse GuestHouse { get; set; }
        [Required, MaxLength(50)]
        public string RoomName { get; set; }
        [Required]
        public string GenderAllowed { get; set; }
        public ICollection<Bed> Beds { get; set; } = new List<Bed>();
        public bool Deleted { get; set; } = false;
        public DateTime CreatedDate { get; set; } = DateTime.UtcNow;
        public int CreatedBy { get; set; }
        public int? ModifiedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public int? DeletedBy { get; set; }
        public DateTime? DeletedDate { get; set; }
    }
}
