using System;
using System.Collections.Generic;

namespace Dal.Models;

public partial class Treatment
{
    public int TreatmentId { get; set; }

    public DateTime TreatmentDate { get; set; }

    public string PationtId { get; set; } = null!;

    public bool IsComing { get; set; }

    public string? Escort { get; set; }

    public int? Cooperation { get; set; }

    public string? NextMeetingPlanning { get; set; }

    public bool? BePaid { get; set; }

    public string? UserId { get; set; }

    public virtual Pationt Pationt { get; set; } = null!;

    public virtual User? User { get; set; }
}
