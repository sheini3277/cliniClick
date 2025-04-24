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
        void Create(BlUser user);
        void Update(BlUser user);
        void Delete(string userId);
        BlUser Get(string userId);



    }
}
