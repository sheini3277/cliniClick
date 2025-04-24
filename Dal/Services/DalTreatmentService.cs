using Bl.Api;
using Dal.Api;
using Dal.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dal.Services
{
    public class DalTreatmentService : IDalTreatment
    {
        dbcontext dbcontext;

        public DalTreatmentService(dbcontext data)
        {
            dbcontext = data;
        }

        public List<Treatment> Get()
        {
            return dbcontext.Treatments.ToList();
        }

        public void Create(Treatment treatment)
        {
            dbcontext.Treatments.Add(treatment);
            dbcontext.SaveChanges();
        }

        public void Update(Treatment treatment)
        {
            Treatment t = dbcontext.Treatments.ToList().Find(x => x.TreatmentId == treatment.TreatmentId);

            if (t != null)
            {
                t.TreatmentDate = treatment.TreatmentDate;
                t.PationtId = treatment.PationtId;
                t.IsComing = treatment.IsComing;
                t.Escort = treatment.Escort;
                t.Cooperation = treatment.Cooperation;
                t.NextMeetingPlanning = treatment.NextMeetingPlanning;
                t.BePaid = treatment.BePaid;
                t.UserId = treatment.UserId;

            }
            dbcontext.SaveChanges();
        }
        public void Delete(int treatmentId)
        {
            Treatment t = dbcontext.Treatments.ToList().Find(x => x.TreatmentId == treatmentId);
            dbcontext.Treatments.Remove(t);
            dbcontext.SaveChanges();
        }
    }
}
