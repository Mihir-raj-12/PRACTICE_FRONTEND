using System.ComponentModel.DataAnnotations;

namespace GuestHouseBooking.Models
{
    public class EmailNotificationLog
    {
        [Key]
        public int NotificationId { get; set; }
        public int? BookingId { get; set; }
        public string ToEmail { get; set; } = null!;
        public string? Subject { get; set; }
        public DateTime? SentDate { get; set; }
    }
}
