using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GuestHouseBooking.Models
{
    public class AuditLog
    {
        public int AuditLogId { get; set; }
        [Required]
        public string Action { get; set; }
        public int? UserId { get; set; }
        [ForeignKey("UserId")]
        public User? User { get; set; }
        public DateTime Timestamp { get; set; } = DateTime.UtcNow;
        public string? OldValue { get; set; }
        public string? NewValue { get; set; }
    }
}
