using Azure;
using Dal.Api;
using Dal.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Numerics;
using System.Text;
using System.Threading.Tasks;

namespace Dal.Services
{
    public class DalPationtService : IDalPationt
    {
        dbcontext dbcontext;

        public DalPationtService(dbcontext data)
        {
            dbcontext = data;
        }

        public List<Pationt> Get()
        {
            return dbcontext.Pationts.ToList();
        }

        public void Create(Pationt pationt)
        {
            try
            {
              dbcontext.Pationts.Add(pationt);
                try
                {
                    dbcontext.SaveChanges();
                }
                catch {
                    dbcontext.Pationts.Local.Remove(pationt);
                }
            }
            catch { 
              
            }
          
           
        }

        public void Update(Pationt pationt)
        {
            Pationt p = dbcontext.Pationts.ToList().Find(x => x.PationtId == pationt.PationtId);

            if (p != null)
            {
                p.FirstName = pationt.FirstName;
                p.LastName = pationt.LastName;
                p.Phone = pationt.Phone;
                p.Age = pationt.Age;
                p.BirthDate = pationt.BirthDate;
                p.Background = pationt.Background;
                p.EducationalFramework = pationt.EducationalFramework;
                p.Diagnosis = pationt.Diagnosis;
                p.CirculationMedium = pationt.CirculationMedium;
                p.StartTreatmentDate = pationt.StartTreatmentDate;
            }
            dbcontext.SaveChanges();
        }
        public void Delete(string pationtId)
        {
            Pationt p = dbcontext.Pationts.ToList().Find(x => x.PationtId == pationtId);
            dbcontext.Pationts.Remove(p);
            dbcontext.SaveChanges();
        }
    } 
}
