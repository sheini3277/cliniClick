using Bl.Api;
using Bl.Models;
using Dal.Api;
using Dal.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bl.Services
{
    public class BlPationtService : IblPationt
    {
        IDal dal;
        public BlPationtService(IDal dal)
        {
            this.dal = dal;
        }


        public List<BlPationt> Get()
        {
            var pList = dal.Pationt.Get();
            List<BlPationt> list = new();
            pList.ForEach(p => list.Add(toBl(p)));
            return list;
        }

        public List<BlPationt> Create(BlPationt pationt)
        {
            dal.Pationt.Create(toDal(pationt));
            return GetByUserId(pationt.TherapistId);
        }

        public List<BlPationt> GetByUserId(string userId)
        {
            var pList = dal.Pationt.Get();
            List<BlPationt> list = new();
            pList.ForEach(p => {
                if (p.TherapistId == userId)
                    list.Add(toBl(p));
                });
            return list;
        }

        public List<BlPationt> Update(BlPationt pationt)
        {
            dal.Pationt.Update(toDal(pationt));
            return GetByUserId(pationt.TherapistId);
        }

        public List<BlPationt> Delete(string pationtId)
        {
            var patientAims = dal.Aim.Get().Where(aim => aim.PaitionId == pationtId).ToList();

            // עבור כל מטרה, מחיקת הפעילויות הקשורות אליה
            foreach (var aim in patientAims)
            {
                // מציאת כל הפעילויות הקשורות למטרה
                var activitiesToDelete = dal.Activity.Get().Where(a => a.ActivityAim == aim.AimId).ToList();

                // מחיקת הפעילויות
                foreach (var activity in activitiesToDelete)
                {
                    dal.Activity.Delete(activity.ActivityId);
                }

                // מחיקת המטרה עצמה
                dal.Aim.Delete(aim.AimId);
            }

            // 2. מחיקת כל הטיפולים של המטופל
            var treatmentsToDelete = dal.Treatment.Get().Where(t => t.PationtId == pationtId).ToList();
            foreach (var treatment in treatmentsToDelete)
            {
                dal.Treatment.Delete(treatment.TreatmentId);
            }
            BlPationt currentPatient = Get().FirstOrDefault(p => p.PationtId == pationtId);
            string userId = currentPatient?.TherapistId;
            dal.Pationt.Delete(pationtId);
            return GetByUserId(userId);
        }

        public BlPationt GetByPatientId(string patientId)
        {
            var pList = dal.Pationt.Get();
            BlPationt patient = toBl(pList.Find(p => p.PationtId == patientId));
            return patient;
        }

  
        public BlPationt toBl(Pationt pationt)
        {
            if (pationt != null)
            {
                BlPationt newPationt = new BlPationt()
                {
                    PationtId = pationt.PationtId,
                    FirstName = pationt.FirstName,
                    LastName = pationt.LastName,
                    TherapistId = pationt.TherapistId,
                    Phone = pationt.Phone,
                    Age = pationt.Age,
                    BirthDate = DateOnly.FromDateTime(pationt.BirthDate),
                    Background = pationt.Background,
                    EducationalFramework = pationt.EducationalFramework,
                    Diagnosis = pationt.Diagnosis,
                    CirculationMedium = pationt.CirculationMedium,
                    StartTreatmentDate = DateOnly.FromDateTime(pationt.StartTreatmentDate)
                };
                return newPationt;
            }
            return null;
        }
        public Pationt toDal(BlPationt pationt)
        {
            if (pationt != null)
            {
                Pationt newPationt = new Pationt()
                {
                    PationtId = pationt.PationtId,
                    FirstName = pationt.FirstName,
                    LastName = pationt.LastName,
                    TherapistId = pationt.TherapistId,
                    Phone = pationt.Phone,
                    Age = pationt.Age,
                    BirthDate = new DateTime(pationt.BirthDate.Year, pationt.BirthDate.Month, pationt.BirthDate.Day, DateTime.Now.Hour, DateTime.Now.Minute, DateTime.Now.Second),
                    Background = pationt.Background,
                    EducationalFramework = pationt.EducationalFramework,
                    Diagnosis = pationt.Diagnosis,
                    CirculationMedium = pationt.CirculationMedium,
                    StartTreatmentDate = new DateTime(pationt.StartTreatmentDate.Year, pationt.StartTreatmentDate.Month, pationt.StartTreatmentDate.Day, DateTime.Now.Hour, DateTime.Now.Minute, DateTime.Now.Second),
                };
                return newPationt;
            }
            return null;
        }
    }
}
