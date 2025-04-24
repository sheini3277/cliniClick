using System;
using System.Collections.Generic;

namespace Dal.Models;

public partial class Pationt
{
    public string PationtId { get; set; } = null!;

    public string FirstName { get; set; } = null!;

    public string LastName { get; set; } = null!;

    public string Phone { get; set; } = null!;

    public int Age { get; set; }

    public DateTime BirthDate { get; set; }

    public string Background { get; set; } = null!;

    public string TherapistId { get; set; } = null!;

    public DateTime StartTreatmentDate { get; set; }

    public string EducationalFramework { get; set; } = null!;

    public string Diagnosis { get; set; } = null!;

    public string CirculationMedium { get; set; } = null!;

    public virtual ICollection<Aim> Aims { get; set; } = new List<Aim>();

    public virtual User Therapist { get; set; } = null!;

    public virtual ICollection<Treatment> Treatments { get; set; } = new List<Treatment>();

    public virtual ICollection<Turn> Turns { get; set; } = new List<Turn>();
}
