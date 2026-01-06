import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod";
import { Calendar, CheckCircle2, Clock, ArrowLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Link, useLocation } from "react-router-dom";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { scrollToSection } from "@/lib/scrollToSection";

const services = [
  { value: "manicure", label: "Маникюр + покрытие гель‑лак" },
  { value: "pedicure", label: "Педикюр + покрытие гель‑лак" },
  { value: "lashes-classic", label: "Наращивание ресниц (классика)" },
  { value: "lashes-2d", label: "Наращивание ресниц (2D)" },
  { value: "lashes-3d", label: "Наращивание ресниц (3D–5D)" },
  { value: "brows", label: "Коррекция и окрашивание бровей" },
  { value: "brows-lamination", label: "Ламинирование бровей" },
  { value: "lash-lamination", label: "Ламинирование ресниц" },
  { value: "other", label: "Другая услуга (укажите в комментарии)" },
];

const timeSlots = [
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
];

const bookingSchema = z.object({
  name: z.string().min(2, "Введите имя"),
  phone: z
    .string()
    .min(10, "Введите корректный номер телефона")
    .regex(/^[\d\s+()-]+$/, "Введите корректный номер телефона"),
  service: z.string().min(1, "Выберите услугу"),
  date: z.string().min(1, "Выберите дату"),
  time: z.string().min(1, "Выберите время"),
  comment: z.string().optional(),
});

type BookingFormData = z.infer<typeof bookingSchema>;

const Booking = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const location = useLocation();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
  });

  const selectedTime = watch("time");

  const onSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Booking data:", data);
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    if (location.hash === "#booking") {
      requestAnimationFrame(() => {
        scrollToSection("booking", { behavior: "auto" });
      });
    }
  }, [location.hash]);

  return (
    <div className="min-h-screen bg-cream-dark/30">
      <Header />
      <main className="pt-28 pb-20">
        <div className="container-narrow">
          <AnimatePresence mode="wait">
            {isSubmitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="max-w-lg mx-auto text-center py-16"
              >
                <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="h-10 w-10 text-green-600" />
                </div>
                <h1 className="font-serif text-4xl font-medium mb-4">
                  Запись подтверждена!
                </h1>
                <p className="text-muted-foreground text-lg mb-8">
                  Мы получили вашу заявку. В ближайшее время администратор свяжется
                  с вами для уточнения деталей.
                </p>
                <Link to="/">
                  <Button variant="gold" size="lg" className="gap-2">
                    <ArrowLeft className="h-4 w-4" />
                    На главную
                  </Button>
                </Link>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <div className="text-center mb-12">
                  <Link
                    to="/"
                    className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Вернуться на главную
                  </Link>
                  <h1 className="font-serif text-4xl md:text-5xl font-medium mb-4">
                    Запись на услугу
                  </h1>
                  <p className="text-muted-foreground max-w-xl mx-auto">
                    Заполните форму — мы подтвердим дату и подберем мастера под ваш
                    запрос.
                  </p>
                </div>

                <form
                  id="booking"
                  onSubmit={handleSubmit(onSubmit)}
                  className="max-w-2xl mx-auto bg-card rounded-2xl p-6 md:p-10 shadow-card scroll-mt-header"
                >
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-base">
                        Имя и фамилия *
                      </Label>
                      <Input
                        id="name"
                        placeholder="Анна Иванова"
                        className="h-12"
                        {...register("name")}
                      />
                      {errors.name && (
                        <p className="text-sm text-destructive">
                          {errors.name.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-base">
                        Телефон *
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+7 (900) 123-45-67"
                        className="h-12"
                        {...register("phone")}
                      />
                      {errors.phone && (
                        <p className="text-sm text-destructive">
                          {errors.phone.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label className="text-base">Услуга *</Label>
                      <Select onValueChange={(value) => setValue("service", value)}>
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="Выберите услугу" />
                        </SelectTrigger>
                        <SelectContent>
                          {services.map((service) => (
                            <SelectItem key={service.value} value={service.value}>
                              {service.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.service && (
                        <p className="text-sm text-destructive">
                          {errors.service.message}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="date" className="text-base flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gold" />
                          Дата *
                        </Label>
                        <Input
                          id="date"
                          type="date"
                          min={today}
                          className="h-12"
                          {...register("date")}
                        />
                        {errors.date && (
                          <p className="text-sm text-destructive">
                            {errors.date.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label className="text-base flex items-center gap-2">
                          <Clock className="h-4 w-4 text-gold" />
                          Время *
                        </Label>
                        <div className="grid grid-cols-4 gap-2">
                          {timeSlots.slice(0, 8).map((time) => (
                            <button
                              key={time}
                              type="button"
                              onClick={() => setValue("time", time)}
                              className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                                selectedTime === time
                                  ? "bg-gold text-white shadow-gold"
                                  : "bg-muted hover:bg-accent"
                              }`}
                            >
                              {time}
                            </button>
                          ))}
                        </div>
                        {errors.time && (
                          <p className="text-sm text-destructive">
                            {errors.time.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="comment" className="text-base">
                        Комментарий
                      </Label>
                      <Textarea
                        id="comment"
                        placeholder="Пожелания или уточнения к услуге..."
                        className="min-h-[100px] resize-none"
                        {...register("comment")}
                      />
                    </div>

                    <Button
                      type="submit"
                      variant="gold"
                      size="xl"
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Отправка...
                        </span>
                      ) : (
                        "Отправить заявку"
                      )}
                    </Button>

                    <p className="text-center text-sm text-muted-foreground">
                      Нажимая кнопку, вы соглашаетесь с{" "}
                      <Link to="/privacy" className="text-gold hover:underline">
                        политикой конфиденциальности
                      </Link>
                    </p>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Booking;
