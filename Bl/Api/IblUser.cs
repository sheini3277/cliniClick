using Bl.Models;
using Dal.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bl.Api
{
    public interface IblUser : Icrud<BlUser>
    {
        List<BlUser> Get();
        List<BlUser> Create(BlUser user);
        List<BlUser> Update(BlUser user);
        List<BlUser> Delete(string userId);
        BlUser Get(string userId);



    }
}
