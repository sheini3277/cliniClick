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

        public void Create(BlPationt pationt)
        {
            dal.Pationt.Create(toDal(pationt));
        }

        public List<BlPationt> GetByUserId(string userId)
        {
            var pList = dal.Pationt.Get();
            List<BlPationt> list = new();
            pList.ForEach(p =>
            list.Add(p.TherapistId == userId ? toBl(p) : null));
            return list;
        }

        public void Update(BlPationt pationt)
        {
            dal.Pationt.Update(toDal(pationt));
        }

        public void Delete(string pationtId)
        {
            dal.Pationt.Delete(pationtId);
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
