using Dal.Api;
using Dal.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dal.Services
{
    public class DalUsersService : IDalUser
    {
        dbcontext dbcontext;

        public DalUsersService(dbcontext data)
        {
            dbcontext = data;
        }

        public void Create(User user)
        {
            dbcontext.Users.Add(user);
            dbcontext.SaveChanges();
        }

        public List<User> Get()
        {
            return dbcontext.Users.ToList();
        }

        public void Update(User user)
        {
            User u = dbcontext.Users.ToList().Find(x => x.UserId == user.UserId);
           
            if (u != null)
            {
                u.Email = user.Email;
                u.Password = user.Password;
                u.FirstName = user.FirstName;
                u.LastName = user.LastName;
                u.TreatmentType = user.TreatmentType;
                u.IsActive = user.IsActive;
                
            }
            dbcontext.SaveChanges();
        }

        public void Delete(string userId)
        {
            User u = dbcontext.Users.ToList().Find(x => x.UserId == userId);
            dbcontext.Users.Remove(u);
            dbcontext.SaveChanges();
        }
        public User Get(string userId)
        {
            return dbcontext.Users.ToList().Find(x => x.UserId == userId);
        }
      
    }
}
