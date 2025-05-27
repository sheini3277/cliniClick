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
    public class treatmentController : Controller
    {
        private readonly IblTreatment treatments;

        public treatmentController(Ibl manager)
        {
            treatments = manager.Treatment;
        }

        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                var result = treatments.Get();
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"שגיאת שרת פנימית: {ex.Message}");
            }
        }

        [HttpPost("AddTreatment")]
        public IActionResult Create(BlTreatment treatment)
        {
            try
            {
                var result = treatments.Create(treatment);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"שגיאת שרת פנימית: {ex.Message}");
            }
        }

        [HttpPut("UpdateTreatment/{TreatmentId}")]
        public IActionResult Update(BlTreatment treatment)
        {
            try
            {
                var result = treatments.Update(treatment);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"שגיאת שרת פנימית: {ex.Message}");
            }
        }

        [HttpDelete("DeleteTreatment")]
        public IActionResult Delete(int treatmentId)
        {
            try
            {
                var result = treatments.Delete(treatmentId);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"שגיאת שרת פנימית: {ex.Message}");
            }
        }

        [HttpGet("getByUserId/{userId}")]
        public IActionResult Get(string userId)
        {
            try
            {
                var result = treatments.GetByUserId(userId);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"שגיאת שרת פנימית: {ex.Message}");
            }
        }

        [HttpGet("getByTreatmentId/{treatmentId}")]
        public IActionResult Get(int treatmentId)
        {
            try
            {
                var result = treatments.GetByTreatmentId(treatmentId);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"שגיאת שרת פנימית: {ex.Message}");
            }
        }
    }
}
