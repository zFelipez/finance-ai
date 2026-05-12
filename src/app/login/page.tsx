import { Button } from "@/_components/ui/button";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="grid h-full grid-cols-2 bg-black  ">
      <div className="justify-center flex h-full w-full flex-col p-8 max-w-[500px] mx-auto ">
        <Image
          src="/finance-ai.svg"
          alt="Finance AI"
          width={173}
          height={39}
          className="mb-8"
        ></Image>

        <h1 className="text-white text-4xl font-bold mb-3 ">Bem-vindo</h1>

        <p className="text-white mt-4">
          A Finance Ai é uma plataforma inovadora para gestão financeira , que
          utiliza iA para monitorar e otimizar suas finanças de forma
          inteligente, facilitando controle de seu orçamento.
        </p>

        <Button className="mt-4 bg-white hover:bg-slate-600 hover:text-white" variant="secondary">Fazer login ou criar uma conta</Button>
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
