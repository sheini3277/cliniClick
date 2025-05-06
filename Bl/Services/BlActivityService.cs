using Bl.Api;
using Bl.Models;
using Dal.Api;
using Dal.Models;
using System;
using System.Collections.Generic;
using System.Diagnostics;
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

        public List<BlActivity> Create(BlActivity activity)
        {
            dal.Activity.Create(toDal(activity));
            return Get();
        }
        public List<BlActivity> creatListActivities(List<BlActivity> activities) {
            activities.ForEach(activity =>
            {
                dal.Activity.Create(toDal(activity));
            });
            return Get();
        }

        public List<BlActivity> Delete(string aimId)
        {
            dal.Activity.Delete(aimId);
            return Get();
        }

        public List<BlActivity> Get()
        {
            var aList = dal.Activity.Get();
            List<BlActivity> list = new();
            aList.ForEach(a => list.Add(toBl(a)));
            return list;
        }

        public List<BlActivity> Update(BlActivity activity)
        {
            dal.Activity.Update(toDal(activity));
            return Get();
        }
        public Dal.Models.Activity toDal(BlActivity bla)
        {
            if (bla != null)
            {
                Dal.Models.Activity activity = new Dal.Models.Activity()
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
        public BlActivity toBl(Dal.Models.Activity a)
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
