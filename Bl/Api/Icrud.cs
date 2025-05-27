using Bl.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bl.Api
{
    public interface Icrud<T>
    {
        List<T> Get();
        List<T> Create(T item);
        List<T> Update(T item);
        //List<T> Delete(T id);
    }
}
