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
    public class BlAimService : IblAim
    {
        IDal dal;
        public BlAimService(IDal dal)
        {
            this.dal = dal;
        }

        public List<BlAim> Create(BlAim aim)
        {
            dal.Aim.Create(toDal(aim));
            return Get();
        }

        public List<BlAim> Delete(string aimId)
        {
            dal.Aim.Delete(aimId);
            return Get();
        }

        public List<BlAim> Get()
        {
            var aList = dal.Aim.Get();
            List<BlAim> list = new();
            aList.ForEach(a => list.Add(toBl(a)));
            return list;
        }
        public List<BlAim> GetByPatientId(string patientId)
        {
            var aList = dal.Aim.Get();
            List<BlAim> list = new();
            aList.ForEach(a =>
            list.Add(a.PaitionId == patientId ? toBl(a) : null));
            return list;
        }

        public List<BlAim> Update(BlAim aim)
        {
            dal.Aim.Update(toDal(aim));
            return Get();
        }
        public Aim toDal(BlAim bla)
        {
            if (bla != null)
            {
                Aim aim = new Aim()
                {
                    AimName = bla.AimName,
                    AimDiscription = bla.AimDiscription,
                    PaitionId = bla.PaitionId,
                };
                return aim;
            }
            return null;
        }
        public BlAim toBl(Aim a)
        {
            if (a != null)
            {
                BlAim aim = new BlAim()
                {
                    AimId = a.AimId,
                    AimName = a.AimName,
                    AimDiscription = a.AimDiscription,
                    PaitionId = a.PaitionId,
                };
                return aim;
            }
            return null;
        }
    }
}
