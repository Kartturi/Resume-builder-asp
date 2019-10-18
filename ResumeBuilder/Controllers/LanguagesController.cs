using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ResumeBuilder.Models;

namespace ResumeBuilder.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LanguagesController : ControllerBase
    {
        private readonly ResumeBuilderContext _context;

        public LanguagesController(ResumeBuilderContext context)
        {
            _context = context;
        }

        // GET: api/Languages
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Language>>> GetLanguage()
        {
            return await _context.Language.ToListAsync();
        }

        // GET: api/Languages/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Language>> GetLanguage(int id)
        {
            var language = await _context.Language.FindAsync(id);

            if (language == null)
            {
                return NotFound();
            }

            return language;
        }

        // PUT: api/Languages/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutLanguage(int id, Language languages)
        {
            int resumeId = id;
            int languagesId = languages.LanguageId;
            var lang = _context.Language.First(l => l.LanguageId == languagesId);

            lang.Name = languages.Name;
            lang.Level = languages.Level;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException e)
            {
                Console.WriteLine(e);
            }


            return NoContent();
        }

        // POST: api/Languages
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost("{id}")]
        public async Task<ActionResult<Language>> PostEducation(int id, Language language)
        {
            _context.Language.Add(language);

            await _context.SaveChangesAsync();

            var newLanguageData = await _context.Language.Where(l => l.ResumeId == id).ToListAsync();

            return Ok(newLanguageData);
        }

        // DELETE: api/Languages/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Language>> DeleteRecommends(int id)
        {
            var languageData = await _context.Language.FindAsync(id);
            if (languageData == null)
            {
                return NotFound();
            }
            int resumeId = languageData.ResumeId;
            _context.Language.Remove(languageData);
            await _context.SaveChangesAsync();

            return Ok(await _context.Language.Where(l => l.ResumeId == resumeId).ToListAsync());
        }

        private bool LanguageExists(int id)
        {
            return _context.Language.Any(e => e.LanguageId == id);
        }
    }
}
