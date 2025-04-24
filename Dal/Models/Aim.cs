using System;
using System.Collections.Generic;

namespace Dal.Models;

public partial class Aim
{
    public int AimId { get; set; }

    public string AimName { get; set; } = null!;

    public string? AimDiscription { get; set; }

    public string PaitionId { get; set; } = null!;

    public virtual ICollection<Activity> Activities { get; set; } = new List<Activity>();

    public virtual Pationt Paition { get; set; } = null!;
}
