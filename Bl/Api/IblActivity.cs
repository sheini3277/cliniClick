using Bl.Models;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bl.Api
{
    public interface IblActivity : Icrud<BlActivity>
    {
        List<BlActivity> Get();

        List<BlActivity> Create(BlActivity activity);
        List<BlActivity> Update(BlActivity activity);
        List<BlActivity> Delete(string activityId);
        List<BlActivity> creatListActivities(List<BlActivity> activities);
    }
}
