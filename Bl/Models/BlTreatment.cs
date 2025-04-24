using Dal.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bl.Models
{
    public class BlTreatment
    {
        public int TreatmentId { get; set; }

        public DateOnly TreatmentDate { get; set; }
        public TimeOnly TreatmentTime { get; set; }

        public string PationtId { get; set; } = null!;

        public bool IsComing { get; set; }

        public string? Escort { get; set; }

        public int? Cooperation { get; set; }

        public string? NextMeetingPlanning { get; set; }

        public bool? BePaid { get; set; }

        public string UserId { get; set; } = null!;

    }

}

