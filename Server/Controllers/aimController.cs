using Bl.Api;
using Bl.Models;
using Dal.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class aimController : Controller
    {
        private readonly IblAim aims;

        public aimController(Ibl manager)
        {
            aims = manager.Aim;
        }

        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                var result = aims.Get();
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"שגיאת שרת פנימית: {ex.Message}");
            }
        }

        [HttpPost("AddAim")]
        public IActionResult Create(BlAim aim)
        {
            try
            {
                var result = aims.Create(aim);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"שגיאת שרת פנימית: {ex.Message}");
            }
        }

        [HttpPost("AddAims")]
        public IActionResult CreateList(List<BlAim> aimss)
        {
            try
            {
                var result = aims.CreateList(aimss);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"שגיאת שרת פנימית: {ex.Message}");
            }
        }

        [HttpPut("UpdateAim/{aimId}")]
        public IActionResult Update(BlAim aim)
        {
            try
            {
                var result = aims.Update(aim);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"שגיאת שרת פנימית: {ex.Message}");
            }
        }

        [HttpDelete("Delete/{aimId}")]
        public IActionResult Delete(int aimId)
        {
            try
            {
                var result = aims.Delete(aimId);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"שגיאת שרת פנימית: {ex.Message}");
            }
        }

        [HttpGet("getByPatientId/{patientId}")]
        public IActionResult GetByPatientId(string patientId)
        {
            try
            {
                var result = aims.GetByPatientId(patientId);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"שגיאת שרת פנימית: {ex.Message}");
            }
        }
    }
}
