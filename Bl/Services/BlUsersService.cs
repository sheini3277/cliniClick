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
    public class BlUsersService : IblUser
    {
        IDal dal;
        public BlUsersService(IDal dal)
        {
            this.dal = dal;
        }


        public List<BlUser> Get()
        {
            var uList = dal.Users.Get();
            List<BlUser> list = new();
            uList.ForEach(u => list.Add(toBl(u)));
            return list;
        }

        public void Create(BlUser user)
        {
            dal.Users.Create(toDal(user));
        }

        public void Update(BlUser user)
        {
            dal.Users.Update(toDal(user));
        }

        public void Delete(string userId)
        {
            dal.Users.Delete(userId);
        }

        public BlUser Get(string userId)
        {
            return toBl(dal.Users.Get(userId));
        }
        public BlUser toBl(User u)
        {
            if (u != null)
            {
                BlUser user = new BlUser()
                {
                    FirstName = u.FirstName,
                    LastName = u.LastName,
                    UserId = u.UserId,
                    Phone = u.Phone,
                    Email = u.Email,
                    IsActive = u.IsActive,
                    Password = u.Password,
                    TreatmentType = u.TreatmentType
                };
                return user;
            }
            return null;
        }

        public User toDal(BlUser u)
        {
            if (u != null)
            {
                User user = new User()
                {
                    FirstName = u.FirstName,
                    LastName = u.LastName,
                    UserId = u.UserId,
                    Phone = u.Phone,
                    Email = u.Email,
                    IsActive = u.IsActive,
                    Password = u.Password,
                    TreatmentType = u.TreatmentType
                };
                return user;
            }
            return null;
        }
    }
}
