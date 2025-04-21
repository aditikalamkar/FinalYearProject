package com.project.AgadgoanApplication.model;

public class SlotAvailability {

	 private String date;
    private String timeSlot;
    private int totalSlots;
    private int bookedSlots;
    private int availableSlots;
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
	public String getTimeSlot() {
		return timeSlot;
	}
	public void setTimeSlot(String timeSlot) {
		this.timeSlot = timeSlot;
	}
	public int getTotalSlots() {
		return totalSlots;
	}
	public void setTotalSlots(int totalSlots) {
		this.totalSlots = totalSlots;
	}
	public int getBookedSlots() {
		return bookedSlots;
	}
	public void setBookedSlots(int bookedSlots) {
		this.bookedSlots = bookedSlots;
	}
	public int getAvailableSlots() {
		return availableSlots;
	}
	public void setAvailableSlots(int availableSlots) {
		this.availableSlots = availableSlots;
	}
	@Override
	public String toString() {
		return "SlotAvailability [date=" + date + ", timeSlot=" + timeSlot + ", totalSlots=" + totalSlots
				+ ", bookedSlots=" + bookedSlots + ", availableSlots=" + availableSlots + "]";
	}
	public SlotAvailability(String date, String timeSlot, int totalSlots, int bookedSlots, int availableSlots) {
		super();
		this.date = date;
		this.timeSlot = timeSlot;
		this.totalSlots = totalSlots;
		this.bookedSlots = bookedSlots;
		this.availableSlots = availableSlots;
	}

    
}
