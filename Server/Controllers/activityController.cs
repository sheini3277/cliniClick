using Bl.Api;
using Bl.Models;
using Microsoft.AspNetCore.Mvc;

namespace Server.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class activityController : Controller
    {
        IblActivity activities;

        public activityController(Ibl manager)
        {
            activities = manager.Activity;
        }
        [HttpGet]
        public List<BlActivity> Get()
        {
            return activities.Get();
        }

        [HttpPost("AddActivity")]
        public List<BlActivity> Create(BlActivity activity)
        {
            return activities.Create(activity);
        }
        [HttpPost("AddActivities")]
        public List<BlActivity> CreateList(List<BlActivity> activitiesList)
        {
            return activities.creatListActivities(activitiesList);
        }
        [HttpPut("UpdateActivity")]
        public List<BlActivity> Update(BlActivity activity)
        {
            return activities.Update(activity);
        }
        [HttpDelete("DeleteActivity")]
        public List<BlActivity> Delete(string activityId)
        {
            return activities.Delete(activityId);
        }


    }
}

