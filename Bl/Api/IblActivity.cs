using Bl.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bl.Api
{
    public interface IblActivity : Icrud<BlActivity>
    {
        List<BlActivity> Get();

        void Create(BlActivity activity);
        void Update(BlActivity activity);
        void Delete(string activityId);
    }
}
