// src/app/components/Footer.js
import React from "react";
import { FaFacebookF, FaTwitter, FaGoogle, FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="text-center bg-body-tertiary">
            {/* Container para redes sociais */}
            <div className="container pt-4">
                <section className="mb-4">
                    {/* Facebook */}
                    <a
                        className="btn btn-link btn-floating btn-lg text-body m-1"
                        href="#!"
                        role="button"
                        data-mdb-ripple-color="dark"
                    >
                        <FaFacebookF />
                    </a>

                    {/* Twitter */}
                    <a
                        className="btn btn-link btn-floating btn-lg text-body m-1"
                        href="#!"
                        role="button"
                        data-mdb-ripple-color="dark"
                    >
                        <FaTwitter />
                    </a>

                    {/* Google */}
                    <a
                        className="btn btn-link btn-floating btn-lg text-body m-1"
                        href="#!"
                        role="button"
                        data-mdb-ripple-color="dark"
                    >
                        <FaGoogle />
                    </a>

                    {/* Instagram */}
                    <a
                        className="btn btn-link btn-floating btn-lg text-body m-1"
                        href="#!"
                        role="button"
                        data-mdb-ripple-color="dark"
                    >
                        <FaInstagram />
                    </a>

                    {/* LinkedIn */}
                    <a
                        className="btn btn-link btn-floating btn-lg text-body m-1"
                        href="#!"
                        role="button"
                        data-mdb-ripple-color="dark"
                    >
                        <FaLinkedin />
                    </a>

                    {/* GitHub */}
                    <a
                        className="btn btn-link btn-floating btn-lg text-body m-1"
                        href="#!"
                        role="button"
                        data-mdb-ripple-color="dark"
                    >
                        <FaGithub />
                    </a>
                </section>
            </div>

            {/* Copyright */}
            <div className="text-center p-3" style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}>
                © 2024 Copyright: 
                <a className="text-body" href="https://mdbootstrap.com/"> MDBootstrap.com</a>
            </div>
        </footer>
    );
}
