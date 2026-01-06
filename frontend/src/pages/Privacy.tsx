import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

const Privacy = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-28 pb-20">
        <div className="container-narrow">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            На главную
          </Link>

          <article className="prose prose-lg max-w-none">
            <h1 className="font-serif text-4xl md:text-5xl font-medium mb-8">
              Политика конфиденциальности
            </h1>

            <p className="text-muted-foreground mb-8">
              Последнее обновление: 1 января 2025 г.
            </p>

            <section className="mb-10">
              <h2 className="font-serif text-2xl font-medium mb-4">
                1. Общие положения
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Настоящая политика конфиденциальности определяет порядок
                обработки и защиты персональных данных клиентов салона Belleza.
                Мы уважаем вашу приватность и используем данные только для
                обеспечения качества сервиса.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="font-serif text-2xl font-medium mb-4">
                2. Какие данные мы собираем
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Мы можем собирать следующие категории данных:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Имя и фамилия</li>
                <li>Контактный телефон</li>
                <li>Дата и время записи</li>
                <li>Информация о выбранных услугах</li>
                <li>Комментарий к записи (если указан)</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="font-serif text-2xl font-medium mb-4">
                3. Цели обработки данных
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Персональные данные используются для:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Подтверждения и управления записью</li>
                <li>Связи с клиентом по вопросам визита</li>
                <li>Повышения качества сервиса</li>
                <li>Отправки уведомлений об изменениях записи</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="font-serif text-2xl font-medium mb-4">
                4. Защита данных
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Мы принимаем необходимые организационные и технические меры для
                защиты персональных данных от утраты, неправомерного доступа и
                раскрытия.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="font-serif text-2xl font-medium mb-4">
                5. Передача данных третьим лицам
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Мы не передаем персональные данные третьим лицам, за исключением
                случаев, предусмотренных законодательством.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="font-serif text-2xl font-medium mb-4">
                6. Срок хранения
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Данные хранятся в течение времени, необходимого для оказания
                услуг, и удаляются по запросу клиента или по завершении срока
                хранения согласно требованиям закона.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="font-serif text-2xl font-medium mb-4">
                7. Контакты
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                По вопросам обработки персональных данных вы можете связаться с
                нами по телефону{" "}
                <a href="tel:+79001234567" className="text-gold hover:underline">
                  +7 (900) 123-45-67
                </a>{" "}
                или по адресу: г. Москва, ул. Тверская, д. 15, офис 301.
              </p>
            </section>
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;
