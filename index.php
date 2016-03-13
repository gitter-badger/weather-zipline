<?php

namespace Index;

use \shgysk8zer0\Core as Core;
use \shgysk8zer0\DOM as DOM;

const PACKAGE = './package.json';
const JS      = 'scripts/custom.js';
const CSS     = 'stylesheets/styles/styles.css';

spl_autoload_register('spl_autoload');
set_include_path(realpath('./classes'));

function build_head(\DOMElement $head)
{
	$json = json_decode(file_get_contents(PACKAGE));
	$head->append('title', $json->name);
	$head->append('meta', null, ['name' => 'description', 'content' => $json->description]);
	$head->append('meta', null, ['name' => 'keywords', 'content' => join(',', $json->keywords)]);
	$head->append('script', null, [
		'type' => 'application/javascript',
		'src' => JS,
		'async' => 'async'
	]);
	$head->append('link', null, [
		'rel' => 'stylesheet',
		'href' => CSS,
		'media' => 'all'
	]);
}

function build_body(\DOMElement $body)
{
	$header = $body->append('header');
	$header->append('h1', 'Your Local Weather');
	$container = $header->append('div');
	$container->append('button', 'Celsius', [
		'type' => 'button',
		'class' => 'toggle',
		'data-value' => 'metric',
		'disabled' => ''
	]);
	$container->append('button', 'Fahrenheit', [
		'type' => 'button',
		'class' => 'toggle',
		'data-value' => 'imperial',
		'disabled' => ''
	]);
	unset($header, $container);

	$body->append('main');
	$body->append('footer', '&copy; ' . date('Y'));
}

function init()
{
	$dom = DOM\HTML::getInstance();
	$dom->documentElement->class = 'loading';
	build_head($dom->head);
	build_body($dom->body);
	return $dom;
}
exit(init());
