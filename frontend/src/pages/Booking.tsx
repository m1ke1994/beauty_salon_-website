import { useEffect, useMemo, useState } from "react";
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
import { usePage } from "@/hooks/useContent";
import { findSection, sortItems } from "@/lib/content";

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
  const { data: page } = usePage("booking");
  const bookingHeader = findSection(page, "booking");
  const formSection = findSection(page, "booking-form");
  const servicesSection = findSection(page, "booking-services");
  const timesSection = findSection(page, "booking-times");
  const successSection = findSection(page, "booking-success");

  const formFields = sortItems(formSection?.items);
  const services = sortItems(servicesSection?.items);
  const timeSlots = sortItems(timesSection?.items);
  const formExtra = formSection?.extra as Record<string, string> | undefined;
  const headerExtra = bookingHeader?.extra as Record<string, string> | undefined;
  const successExtra = successSection?.extra as Record<string, string> | undefined;

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

  const today = useMemo(() => new Date().toISOString().split("T")[0], []);

  useEffect(() => {
    if (location.hash === "#booking") {
      requestAnimationFrame(() => {
        scrollToSection("booking", { behavior: "auto" });
      });
    }
  }, [location.hash]);

  if (!bookingHeader || !formSection) {
    return null;
  }

  const nameField = formFields[0];
  const phoneField = formFields[1];
  const serviceField = formFields[2];
  const dateField = formFields[3];
  const timeField = formFields[4];
  const commentField = formFields[5];

  return (
    <div className="min-h-screen bg-muted/40">
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
                  {successSection?.title ?? "Запись подтверждена!"}
                </h1>
                <p className="text-muted-foreground text-lg mb-8">
                  {successSection?.description ?? ""}
                </p>
                <Link to={successExtra?.cta_url ?? "/"}>
                  <Button variant="gold" size="lg" className="gap-2">
                    <ArrowLeft className="h-4 w-4" />
                    {successExtra?.cta_text ?? "На главную"}
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
                    to={headerExtra?.back_link_url ?? "/"}
                    className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    {headerExtra?.back_link_text ?? "Вернуться на главную"}
                  </Link>
                  <h1 className="font-serif text-4xl md:text-5xl font-medium mb-4">
                    {bookingHeader.title}
                  </h1>
                  <p className="text-muted-foreground max-w-xl mx-auto">
                    {bookingHeader.description}
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
                        {nameField?.title ?? "Имя и фамилия *"}
                      </Label>
                      <Input
                        id="name"
                        placeholder={nameField?.subtitle ?? ""}
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
                        {phoneField?.title ?? "Телефон *"}
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder={phoneField?.subtitle ?? "+7 (900) 123-45-67"}
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
                      <Label className="text-base">
                        {serviceField?.title ?? "Услуга *"}
                      </Label>
                      <Select onValueChange={(value) => setValue("service", value)}>
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder={serviceField?.subtitle ?? ""} />
                        </SelectTrigger>
                        <SelectContent>
                          {services.map((service) => {
                            const value = (service.meta as { value?: string })?.value ?? service.title;
                            return (
                              <SelectItem key={service.id} value={value}>
                                {service.title}
                              </SelectItem>
                            );
                          })}
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
                          {dateField?.title ?? "Дата *"}
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
                          {timeField?.title ?? "Время *"}
                        </Label>
                        <div className="grid grid-cols-4 gap-2">
                          {timeSlots.map((time) => (
                            <button
                              key={time.id}
                              type="button"
                              onClick={() => setValue("time", time.title)}
                              className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                                selectedTime === time.title
                                  ? "bg-gold text-graphite shadow-gold"
                                  : "bg-muted hover:bg-accent"
                              }`}
                            >
                              {time.title}
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
                        {commentField?.title ?? "Комментарий"}
                      </Label>
                      <Textarea
                        id="comment"
                        placeholder={commentField?.subtitle ?? ""}
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
                          {formExtra?.submit_loading_text ?? "Отправка..."}
                        </span>
                      ) : (
                        formExtra?.submit_text ?? "Отправить заявку"
                      )}
                    </Button>

                    {formExtra?.consent_text && (
                      <p className="text-center text-sm text-muted-foreground">
                        {formExtra.consent_text}{" "}
                        {formExtra.consent_url && (
                          <Link to={formExtra.consent_url} className="text-gold hover:underline">
                            Политика конфиденциальности
                          </Link>
                        )}
                      </p>
                    )}
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
