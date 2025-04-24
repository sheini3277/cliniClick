using System;
using System.Collections.Generic;

namespace Dal.Models;

public partial class Activity
{
    public int ActivityId { get; set; }

    public string Activity1 { get; set; } = null!;

    public int ActivityAim { get; set; }

    public string? ActivityDiscription { get; set; }

    public virtual Aim ActivityAimNavigation { get; set; } = null!;
}
