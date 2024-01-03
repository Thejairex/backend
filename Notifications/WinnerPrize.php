<?php

namespace App\Notifications;

use App\Models\Prize;
use App\Models\Raffle;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class WinnerPrize extends Notification
{
    use Queueable;

    public Raffle $raffle;
    public Prize $prize;

    /**
     * Create a new notification instance.
     */
    public function __construct(Raffle $raffle, Prize $prize)
    {
        $this->raffle = $raffle;
        $this->prize = $prize;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['database'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
                    ->line('The introduction to the notification.')
                    ->action('Notification Action', url('/'))
                    ->line('Thank you for using our application!');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            'id_raffle' => $this->raffle->id,
            'id_prize' => $this->prize->id,
            'title' => 'You won a prize!',
            'message' => 'You won the prize '.$this->prize->title.' in the raffle '.$this->raffle->title.'!',
        ];
    }
}
