using Dal.Api;
using Dal.Models;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bl.Api
{
    public interface IDalActivity : Icrud<Dal.Models.Activity>
    {
        List<Dal.Models.Activity> Get();

        void Create(Dal.Models.Activity activity);
        void Update(Dal.Models.Activity activity);
        void Delete(int activityId);
    }
}
