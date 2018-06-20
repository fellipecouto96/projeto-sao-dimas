using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using WebSiteSaoDima.Models;

namespace WebSiteSaoDima.Controllers
{
    public class CasamentoController : Controller
    {
        private Trab_LabEntities db = new Trab_LabEntities();

        // GET: Casamento
        public ActionResult Index()
        {
            return View(db.Casamento.ToList());
        }

        // GET: Casamento/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Casamento casamento = db.Casamento.Find(id);
            if (casamento == null)
            {
                return HttpNotFound();
            }
            return View(casamento);
        }

        // GET: Casamento/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Casamento/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        public ActionResult Create([Bind(Include = "id,noivo,noiva,data,email,solicitante,msg,telefone,aprovado")] Casamento casamento)
        {
            casamento.aprovado = false;

            if (ModelState.IsValid)
            {
                db.Casamento.Add(casamento);
                db.SaveChanges();
                return RedirectToAction("Casamento", "Home");
            }

            return RedirectToAction("Casamento", "Home");
        }

        // GET: Casamento/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Casamento casamento = db.Casamento.Find(id);
            if (casamento == null)
            {
                return HttpNotFound();
            }
            return View(casamento);
        }

        // POST: Casamento/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "id,noivo,noiva,data,email,solicitante,msg,telefone,aprovado")] Casamento casamento)
        {
            if (ModelState.IsValid)
            {
                db.Entry(casamento).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(casamento);
        }

        // GET: Casamento/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Casamento casamento = db.Casamento.Find(id);
            if (casamento == null)
            {
                return HttpNotFound();
            }
            return View(casamento);
        }

        // POST: Casamento/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            Casamento casamento = db.Casamento.Find(id);
            db.Casamento.Remove(casamento);
            db.SaveChanges();
            return RedirectToAction("Index");
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        [HttpPost]
        public ActionResult Aprova(int id)
        {
            Casamento casamento = db.Casamento.SingleOrDefault(c => c.id == id);

            casamento.aprovado = true;
            db.Evento.Add(new Evento() { nome = "Casamento " + casamento.noivo + " & " + casamento.noiva, dataHora = casamento.data,tipoEvento = db.TipoEvento.First().id, imagemEvento = db.Evento.First().imagemEvento });

            db.SaveChanges();




            return RedirectToAction("Casamento", "Home");
        }

    }
}
