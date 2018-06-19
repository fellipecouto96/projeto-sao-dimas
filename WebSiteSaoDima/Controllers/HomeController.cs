﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebSiteSaoDima.Models;

namespace WebSiteSaoDima.Controllers
{
    public class HomeController : Controller
    {
        Trab_LabEntities contexto = new Trab_LabEntities();
        // GET: Home
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult Login(string email, string senha)
        {
            string msg = "";
            Usuario usu = contexto.Usuario.SingleOrDefault(u => u.email == email);

            if(usu == null)
            {
                msg = "Usuário não existe.";
            }
            else if (usu.senha != senha)
            {
                msg = "Senha Incorreta.";
            }
            else
            {
                msg = "Bem vindo " + usu.nome + "!";
                Session["Usuario"] = usu;
            }
            return View("Index");
        }
        
        public ActionResult Logout()
        {
            Session["Usuario"] = null;

            return View("Index");
        }

        public ActionResult Cadastrar(Usuario usuario = null)
        {
           
            return View();
        }

        public ActionResult Historia()
        {
            return View();
        }

        public ActionResult Casamento()
        {
            return View();
        }

        public ActionResult FaleConosco()
        {
            return View();
        }

        public ActionResult Noticias()
        {
            return View();
        }

        public ActionResult Oracoes()
        {
            return View();
        }

    }
}