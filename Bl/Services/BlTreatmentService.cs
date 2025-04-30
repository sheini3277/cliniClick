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
    public class BlTreatmentService : IblTreatment
    {
        IDal dal;
        public BlTreatmentService(IDal dal)
        {
            this.dal = dal;
        }

        public void Create(BlTreatment treatment)
        {
            dal.Treatment.Create(toDal(treatment));
        }

        public void Delete(int treatmentId)
        {
            dal.Treatment.Delete(treatmentId);
        }

        public List<BlTreatment> Get()
        {
            var tList = dal.Treatment.Get();
            List<BlTreatment> list = new();
            tList.ForEach(t => list.Add(toBl(t)));
            return list;
        }

        public List<BlTreatment> GetByUserId(string userId)
        {
            var tList = dal.Treatment.Get();
            List<BlTreatment> list = new();
            tList.ForEach(t =>
            list.Add(t.UserId == userId ? toBl(t) : null));
            return list;
        }
        public BlTreatment GetByTreatmentId(int treatmentId)
        {
            var tList = dal.Treatment.Get();
            BlTreatment treatment = toBl(tList.Find(t => t.TreatmentId == treatmentId)); 
            return treatment;
        }

        public void Update(BlTreatment treatment)
        {
            
            dal.Treatment.Update(toDal(treatment));
        }
        public Treatment toDal(BlTreatment blt)

        {
            if (blt != null)
            {
                Treatment treatment = new Treatment()
                {
                    TreatmentId = blt.TreatmentId!=null? blt.TreatmentId:0,
                    TreatmentDate = new DateTime( blt.TreatmentDate.Year, blt.TreatmentDate.Month, blt.TreatmentDate.Day, blt.TreatmentTime.Hour, blt.TreatmentTime.Minute, DateTime.Now.Second),
                    PationtId = blt.PationtId,
                    IsComing = blt.IsComing,
                    Escort = blt.Escort,
                    Cooperation = blt.Cooperation,
                    NextMeetingPlanning = blt.NextMeetingPlanning,
                    BePaid = blt.BePaid,
                    UserId = blt.UserId

                };
                return treatment;
            }
            return null;
        }
        public BlTreatment toBl(Treatment t)
        {
            if (t != null)
            {
                BlTreatment treatment = new BlTreatment()
                {
                    TreatmentDate = DateOnly.FromDateTime(t.TreatmentDate) ,
                    TreatmentTime = TimeOnly.FromDateTime(t.TreatmentDate),
                    PationtId = t.PationtId,
                    IsComing = t.IsComing,
                    Escort = t.Escort,
                    Cooperation = t.Cooperation,
                    NextMeetingPlanning = t.NextMeetingPlanning,
                    BePaid = t.BePaid,
                    UserId = t.UserId,
                    TreatmentId = t.TreatmentId
                };
                return treatment;
            }
            return null;
        }
    }
}
