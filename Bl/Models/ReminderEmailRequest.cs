using System.Collections.Generic;

namespace CliniClick.Models
{
    public class ReminderEmailRequest
    {
        public string To { get; set; }
        public string Subject { get; set; }
        public string TherapistName { get; set; }
        public List<TreatmentInfo> Treatments { get; set; }
    }

    public class TreatmentInfo
    {
        public string PatientName { get; set; }
        public string PatientId { get; set; }
        public string Date { get; set; }
        public string Time { get; set; }
        public string Notes { get; set; }
    }

    public class AutomaticReminderRequest
    {
        public string ApiKey { get; set; }
    }
}

