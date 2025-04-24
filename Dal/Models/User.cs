using System;
using System.Collections.Generic;

namespace Dal.Models;

public partial class User
{
    public string UserId { get; set; } = null!;

    public string FirstName { get; set; } = null!;

    public string LastName { get; set; } = null!;

    public string Phone { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string TreatmentType { get; set; } = null!;

    public bool IsActive { get; set; }

    public string Password { get; set; } = null!;

    public virtual ICollection<Pationt> Pationts { get; set; } = new List<Pationt>();

    public virtual ICollection<Treatment> Treatments { get; set; } = new List<Treatment>();
}
