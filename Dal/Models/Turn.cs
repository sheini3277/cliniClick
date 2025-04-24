using System;
using System.Collections.Generic;

namespace Dal.Models;

public partial class Turn
{
    public int Id { get; set; }

    public string PatientId { get; set; } = null!;

    public DateTime Date { get; set; }

    public TimeSpan Time { get; set; }

    public virtual Pationt Patient { get; set; } = null!;
}
