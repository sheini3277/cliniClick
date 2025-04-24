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
    public class BlActivityService: IblActivity
    {
        IDal dal;
        public BlActivityService(IDal dal)
        {
            this.dal = dal;
        }

        public void Create(BlActivity activity)
        {
            dal.Activity.Create(toDal(activity));
        }

        public void Delete(string aimId)
        {
            dal.Activity.Delete(aimId);
        }

        public List<BlActivity> Get()
        {
            var aList = dal.Activity.Get();
            List<BlActivity> list = new();
            aList.ForEach(a => list.Add(toBl(a)));
            return list;
        }

        public void Update(BlActivity activity)
        {
            dal.Activity.Update(toDal(activity));
        }
        public Activity toDal(BlActivity bla)
        {
            if (bla != null)
            {
                Activity activity = new Activity()
                {
                    Activity1 = bla.Activity1,
                    ActivityAim = bla.ActivityAim,
                    ActivityDiscription = bla.ActivityDiscription,
                    ActivityId = bla.ActivityId,
                };
                return activity;
            }
            return null;
        }
        public BlActivity toBl(Activity a)
        {
            if (a != null)
            {
                BlActivity activity = new BlActivity()
                {
                    Activity1 = a.Activity1,
                    ActivityAim = a.ActivityAim,
                    ActivityDiscription = a.ActivityDiscription,
                    ActivityId = a.ActivityId,
                };
                return activity;
            }
            return null;
        }
    }
}
