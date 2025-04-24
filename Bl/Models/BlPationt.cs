using Dal.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bl.Models
{
    public class BlPationt
    {
        public string PationtId { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Phone { get; set; }

        public int Age { get; set; }

        public DateOnly BirthDate { get; set; }
        public string Background { get; set; }

        public string TherapistId { get; set; }

        public DateOnly StartTreatmentDate { get; set; }

        public string EducationalFramework { get; set; }

        public string Diagnosis { get; set; }

        public string CirculationMedium { get; set; }
    }
}
