import { Button } from "@/_components/ui/button";
import { LogInIcon } from "lucide-react";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="grid h-full grid-cols-2 bg-black">
      <div className="mx-auto flex h-full w-full max-w-[500px] flex-col justify-center p-8">
        <Image
          src="/finance-ai.svg"
          alt="Finance AI"
          width={173}
          height={39}
          className="mb-8"
        ></Image>

        <h1 className="mb-3 text-4xl font-bold text-white">Bem-vindo</h1>

        <p className="mt-4 text-white">
          A Finance Ai é uma plataforma inovadora para gestão financeira , que
          utiliza iA para monitorar e otimizar suas finanças de forma
          inteligente, facilitando controle de seu orçamento.
        </p>

        <Button
          variant="outline"
          className="mt-4 bg-white  hover:text-white"
        >
          <LogInIcon></LogInIcon>
          Fazer login ou criar uma conta
        </Button>
      </div>
      <div className="relative h-full w-full">
        <Image
          src="/login-page.png"
          alt="Login Image"
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
}
