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
    public class DalActivityService : IDalActivity
    {
        dbcontext dbcontext;

        public DalActivityService(dbcontext data)
        {
            dbcontext = data;
        }
        public void Create(Activity activity)
        {
            try
            {
                dbcontext.Activities.Add(activity);
                try
                {
                    dbcontext.SaveChanges();
                }

                catch
                {
                    dbcontext.Activities.Local.Remove(activity);
                }
            }
            catch
            {

            }
        }
        public void Delete(int activityId)
        {
            Activity a = dbcontext.Activities.ToList().Find(x => x.ActivityId == activityId);
            dbcontext.Activities.Remove(a);
            dbcontext.SaveChanges();
        }

        public List<Activity> Get()
        {
            return dbcontext.Activities.ToList();
        }

        public void Update(Activity activity)
        {
            Activity a = dbcontext.Activities.ToList().Find(x => x.ActivityId == activity.ActivityId);

            if (a != null)
            {
                a.Activity1 = activity.Activity1;
                a.ActivityAim = activity.ActivityAim;
                a.ActivityDiscription = activity.ActivityDiscription;
            }
            dbcontext.SaveChanges();
        }
    }
}
