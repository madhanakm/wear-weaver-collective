const Map = () => {
  return (
    <div className="relative w-full h-[400px] rounded-lg overflow-hidden border">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3914.5234567890123!2d77.3456789!3d11.1234567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTHCsDA3JzI0LjQiTiA3N8KwMjAnNDQuNCJF!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin&q=27+Bridge+Way+Colony+Extension+Govindammal+Layout+Vk+Puram+Tiruppur+Tamil+Nadu+641602"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Nisanth Apparels Location"
      />
    </div>
  );
};

export default Map;
