using Dal.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dal.Api
{
    public interface Icrud<T>
    {
        List<T> Get();
        void Create(T item);
        void Update(T item);
        void Delete(string id);
    }
}
