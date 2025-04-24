using Dal.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace Dal.Api
{
    public interface IDalPationt :Icrud<Pationt>
    {
        List<Pationt> Get();
        void Create(Pationt pationt);
        void Update(Pationt pationt);
        void Delete(string pationtId);
    }
}
