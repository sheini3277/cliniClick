using Dal.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace Dal.Api
{
    public interface IDalUser : Icrud<User>
    {
        List<User> Get();
        void Create(User user);
        void Update(User user);
        void Delete(string userId);
        User Get(string userId);
    }
}
