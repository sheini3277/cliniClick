using Bl.Api;
using Bl.Models;
using Bl.Services;
using Dal.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Server.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class userController : ControllerBase
    {
        IblUser users;

        public userController(Ibl manager)
        {
            users = manager.Users;
        }
        [HttpGet]
        public List<BlUser> Get()
        {
            
            return users.Get(); 
        }

        [HttpPost("Add")]
        public List<BlUser> Create(BlUser user)
        {
            return users.Create(user);
        }
        [HttpPut("update/{userId}")]
        public IActionResult Update(BlUser user)
        {
            users.Update(user);
            return Ok(true);
        }
        [HttpDelete("Delete/{userId}")]
        public List<BlUser> Delete(string userId)
        {
            return users.Delete(userId);
        }
        [HttpGet("GetById/{userId}")]
        public IActionResult GetById(string userId) { 
            return Ok(users.Get(userId));
        }
        // GET: userController
        //public ActionResult Index()
        //{
        //    return View();
        //}

        //// GET: userController/Details/5
        //public ActionResult Details(int id)
        //{
        //    return View();
        //}

        //// GET: userController/Create
        //public ActionResult Create()
        //{
        //    return View();
        //}

        //// POST: userController/Create
        //[HttpPost]
        //[ValidateAntiForgeryToken]
        //public ActionResult Create(IFormCollection collection)
        //{
        //    try
        //    {
        //        return RedirectToAction(nameof(Index));
        //    }
        //    catch
        //    {
        //        return View();
        //    }
        //}

        //// GET: userController/Edit/5
        //public ActionResult Edit(int id)
        //{
        //    return View();
        //}

        //// POST: userController/Edit/5
        //[HttpPost]
        //[ValidateAntiForgeryToken]
        //public ActionResult Edit(int id, IFormCollection collection)
        //{
        //    try
        //    {
        //        return RedirectToAction(nameof(Index));
        //    }
        //    catch
        //    {
        //        return View();
        //    }
        //}

        //// GET: userController/Delete/5
        //public ActionResult Delete(int id)
        //{
        //    return View();
        //}

        //// POST: userController/Delete/5
        //[HttpPost]
        //[ValidateAntiForgeryToken]
        //public ActionResult Delete(int id, IFormCollection collection)
        //{
        //    try
        //    {
        //        return RedirectToAction(nameof(Index));
        //    }
        //    catch
        //    {
        //        return View();
        //    }
        //}
    }
}
