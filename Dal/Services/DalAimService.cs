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
    public class DalAimService : IDalAim
    {
        dbcontext dbcontext;

        public DalAimService(dbcontext data)
        {
            dbcontext = data;
        }
        public void Create(Aim aim)
        {
            dbcontext.Aims.Add(aim);
            dbcontext.SaveChanges();
        }

        public void Delete(string aimName)
        {
            Aim a = dbcontext.Aims.ToList().Find(x => x.AimName == aimName);
            dbcontext.Aims.Remove(a);
            dbcontext.SaveChanges();
        }

        public List<Aim> Get()
        {
            return dbcontext.Aims.ToList();
        }

        public void Update(Aim aim)
        {
            Aim a = dbcontext.Aims.ToList().Find(x => x.AimId == aim.AimId);

            if (a != null)
            {
                a.AimName = aim.AimName;
                a.AimDiscription = aim.AimDiscription;
                a.Paition = aim.Paition;
            }
            dbcontext.SaveChanges();
        }
    }
}
